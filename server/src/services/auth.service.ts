import { User } from "../models/User";
import { AuthProvider, RegisterUserDTO, UserPayload } from "../types/user";
import { HttpError } from "../utils/errors.util";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { generateJwtToken } from "../utils/jwt.util";
import axios from "axios";

// AuthService
class AuthService {
  private googleClient: OAuth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new HttpError(
        "GOOGLE_CLIENT_ID is missing from the environment variables!",
        500,
      );
    }
    this.googleClient = new OAuth2Client(clientId);
  }

  /* Public Functions */

  public async registerUser(data: RegisterUserDTO) {
    const existingUser = await User.findOne({ email: data.email as string });

    if (existingUser) {
      throw new HttpError("This email is already Exists!", 401);
    }

    const user = await User.create({
      ...data,
      provider: AuthProvider.email
    });

    return {
      user,
      token: generateJwtToken({ _id: user._id, email: user.email }),
    };
  }

  public async login(email: string, password: string) {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpError("Invalid Credentials!", 401);
    }

    return {
      user,
      token: generateJwtToken({ _id: user._id, email: user.email }),
    };
  }

  public async loginWithGoogle(idToken: string) {
    const googleUser = await this.verifyGoogelToken(idToken);

    if (!googleUser?.email) {
      throw new HttpError("Invalid Google Token!", 400);
    }

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        name: googleUser.name || "Google User",
        email: googleUser.email,
        picture: googleUser.picture || null,
        provider: AuthProvider.google,
        providerId: googleUser.sub,
      });
    }

    return {
      user,
      token: generateJwtToken({ _id: user._id, email: user.email }),
    };
  }

  public async loginWithFacebook(accessToken: string) {
    const fbUser = await this.verifyFacebookToken(accessToken);

    let user = await User.findOne({ email: fbUser.email });

    if (!user) {
      user = await User.create({
        name: fbUser.name,
        email: fbUser.email,
        picture: fbUser.picture,
        provider: AuthProvider.facebook,
        providerId: fbUser.id
      });
    }

    return {
      user,
      token: generateJwtToken({ _id: user._id, email: user.email })
    };
  }

  public async getUser(userId: string) {
    return User.findById(userId);
  }

  /* Private Functions */
  private async verifyGoogelToken(
    idToken: string,
  ): Promise<TokenPayload | undefined> {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new HttpError(
        "GOOGLE_CLIENT_ID is missing in the environment variables!",
      );
    }

    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: clientId,
    });

    return ticket.getPayload();
  }

  private async verifyFacebookToken(accessToken: string) {
    const response = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email,picture",
        access_token: accessToken,
      },
    });

    if (!response.data || response.data.error) {
      throw new HttpError("Invalid Facebook Token");
    }

    return response.data;
  }
}

export const authService = new AuthService();
