import { useTheme } from "../../../theme/ThemeProvider";
import { AllWalletTypesAndProviders } from "../../../types/wallet";
import { getWalletIcon } from "../../../utils/wallet.utils";

const WalletIconRenderer = ({ icon }: { icon: string }) => {
    const { theme } = useTheme();

    return getWalletIcon(icon as AllWalletTypesAndProviders, theme.colors.text);
}

export default WalletIconRenderer;