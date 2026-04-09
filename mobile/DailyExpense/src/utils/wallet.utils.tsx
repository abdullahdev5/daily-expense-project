import { AllWalletTypesAndProviders, WalletCardProvider, WalletDigitalProvider, WalletType } from "../types/wallet";
// Wallet Types Icons
import CashIcon from '@assets/icons/wallet/types/cash.svg';
import BankIcon from '@assets/icons/wallet/types/bank.svg';
import CardIcon from '@assets/icons/wallet/types/card.svg';
import DigitalIcon from '@assets/icons/wallet/types/digital.svg';
// Wallet Provider Icons
// Card Provider Icons
import VisaIcon from '@assets/icons/wallet/providers/card/visa.svg';
import MasterCardIcon from '@assets/icons/wallet/providers/card/mastercard.svg';
import AmexIcon from '@assets/icons/wallet/providers/card/amex.svg';
import DiscoverIcon from '@assets/icons/wallet/providers/card/discover.svg';
// Digital Provider Icons
import JazzcashIcon from '@assets/icons/wallet/providers/digital/jazzcash.svg';
import EasypaisaIcon from '@assets/icons/wallet/providers/digital/easypaisa.svg';
import SadapayIcon from '@assets/icons/wallet/providers/digital/sadapay.svg';
import PaypalIcon from '@assets/icons/wallet/providers/digital/paypal.svg';
import GooglePayIcon from '@assets/icons/wallet/providers/digital/googlepay.svg';
import ApplePayIcon from '@assets/icons/wallet/providers/digital/applepay.svg';

import { JSX, ReactNode } from "react";
import AppSvgIcon from "@components/SvgIcon";
import { useTheme } from "../theme/ThemeProvider";
import { ColorValue } from "react-native";



const ICON_MAP: Record<AllWalletTypesAndProviders, any> = {
    // Wallet Types
    cash: CashIcon,
    bank: BankIcon,
    card: CardIcon,
    digital: DigitalIcon,
    // Wallet Card Providers
    visa: VisaIcon,
    mastercard: MasterCardIcon,
    amex: AmexIcon,
    discover: DiscoverIcon,
    // Wallet Digital Providers
    jazzcash: JazzcashIcon,
    easypaisa: EasypaisaIcon,
    sadapay: SadapayIcon,
    paypal: PaypalIcon,
    googlepay: GooglePayIcon,
    applepay: ApplePayIcon
}

const STROKE_ICONS: AllWalletTypesAndProviders[] = ['digital'];

export const getWalletIcon = (iconKey: AllWalletTypesAndProviders, textColor: ColorValue): JSX.Element | null => {
    const IconComponent = ICON_MAP[iconKey];

    const isStrokeIcon = STROKE_ICONS.includes(iconKey);

    return IconComponent ? (
        <AppSvgIcon
            icon={IconComponent}
            fill={isStrokeIcon ? 'none' : textColor}
            color={undefined}
            stroke={isStrokeIcon ? textColor : 'none'}
        />
    ) : null;
}