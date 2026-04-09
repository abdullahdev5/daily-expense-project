import { View, Text } from 'react-native';
import React, { JSX, useEffect, useMemo, useRef, useState } from 'react';
import AppScreen from '../../../components/AppScreen';
import AppText from '../../../components/Text';
import AppBar from '../../../components/AppBar';
import AppCard from '@components/Card';
import { Column, Row } from '@components/Layout';
import AppIcon from '@components/Icon';
import { useTheme } from '../../../theme/ThemeProvider';
import AppFormInput from '@components/FormInput';
import { Formik, FormikProps, useFormikContext } from 'formik';
import {
  AllWalletProviders,
  CreateWalletPayload,
  WalletType,
} from '../../../types/wallet';
import {
  walletCardProviders,
  walletDigitalProviders,
  walletTypes,
} from '../../../constants/walletConstants';
import WalletDropdownItem from '@components/feature/wallet/WalletDropdownItem';
import FormDropdownComponent from '@components/FormDropdown';
import { isNullOrEmpty } from '../../../utils/string';
import WalletIconRenderer from '@components/feature/wallet/WalletIconRenderer';
import { currenciesDropdownData } from '../../../constants/currencies';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import AppButton from '@components/Button';
import { useSnackbarStore } from '../../../store/snackbarStore';
import { createWalletService } from '../../../services/wallet.service';
import AppActivityLoader from '@components/Loader';
import { colors } from '../../../theme/colors';

const WalletScreen = () => {
  const { theme } = useTheme();
  const showSnackbar = useSnackbarStore(s => s.showSnackbar);
  const [isCreateWalletLoading, setCreateWalletLoading] =
    useState<boolean>(false);
  const formikRef = useRef<FormikProps<CreateWalletPayload>>(null);

  const createWallet = async (values: CreateWalletPayload) => {
    setCreateWalletLoading(true);

    const res = await createWalletService(values);

    if (res.success) {
      // Success
      setCreateWalletLoading(false);
      formikRef.current?.resetForm(); // Resetting Form
      return showSnackbar(res.message, { type: 'success' });
    } else {
      // Error
      setCreateWalletLoading(false);
      return showSnackbar(res.message, { type: 'error' });
    }
  };

  return (
    <AppScreen>
      <AppBar title="Wallet" showBackButton={false} />

      {/* Create Wallet Card */}
      <Formik<CreateWalletPayload>
        innerRef={formikRef}
        initialValues={{
          name: '',
          type: 'cash',
          provider: null,
          currency: 'PKR',
        }}
        onSubmit={async values => {
          console.log(`Add Wallet Values: ${JSON.stringify(values)}`);
          await createWallet(values);
        }}
      >
        {({ handleSubmit, submitCount }) => (
          <AddWalletFormContent
            handleSubmit={handleSubmit}
            submitCount={submitCount}
            isCreateWalletLoading={isCreateWalletLoading}
          />
        )}
      </Formik>
    </AppScreen>
  );
};

type AddWalletFormProps = {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  submitCount: number;
  isCreateWalletLoading: boolean;
};
const AddWalletFormContent = ({
  handleSubmit,
  submitCount,
  isCreateWalletLoading,
}: AddWalletFormProps) => {
  const { values, setFieldValue } = useFormikContext<CreateWalletPayload>();
  const { theme } = useTheme();

  useEffect(() => {
    if (values.type !== 'card' && values.type !== 'digital') {
      setFieldValue('provider', null);
    }
  }, [values.type, setFieldValue]);

  const walletProvidersData = useMemo(() => {
    switch (values.type) {
      case 'card':
        return walletCardProviders;
      case 'digital':
        return walletDigitalProviders;
      default:
        return [];
    }
  }, [values.type]);

  const showWalletProvider =
    values.type === 'card' || values.type === 'digital';

  // Wallet Provider Dropdown Animated values
  const animatedOPacity = useSharedValue(0);
  const animatedTranslateY = useSharedValue(-10);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedOPacity.value,
    transform: [{ translateY: animatedTranslateY.value }],
    overflow: 'hidden',
    padding: 0,
    margin: 0,
  }));

  const duration = 500;
  useEffect(() => {
    animatedOPacity.value = withTiming(showWalletProvider ? 1 : 0, {
      duration,
    });
    animatedTranslateY.value = withTiming(showWalletProvider ? 0 : -10, {
      duration,
      easing: Easing.out(Easing.ease),
    });
  }, [showWalletProvider]);

  return (
    <AppCard margin={20} padding={20}>
      <Row spacing={5} crossAxisAlignment="flex-start">
        <AppIcon
          name="add"
          color={theme.colors.primary}
          size={theme.fontSize.xLarge}
        />
        <Column>
          <AppText color={theme.colors.primary} fontSize={theme.fontSize.large}>
            Add Wallet
          </AppText>

          <AppText fontSize={theme.fontSize.small}>create your wallet</AppText>
        </Column>
      </Row>

      <Column spacing={10} style={{ paddingTop: 30 }}>
        <AppFormInput
          placeholder="Wallet Name"
          name="name"
          submitCount={submitCount}
          validator={value => {
            if (value.trim().length === 0) {
              return 'Wallet Name is required!';
            }
            return undefined;
          }}
        />

        <FormDropdownComponent<WalletType>
          name={'type'}
          submitCount={submitCount}
          validator={value => {
            if (isNullOrEmpty(value)) {
              return 'Wallet Type is Required!';
            }
            return undefined;
          }}
          data={walletTypes}
          placeholder="Select Wallet Type"
          renderItem={(item, selected) => (
            <WalletDropdownItem item={item} selected={selected} />
          )}
          renderLeftSelectedIcon={item =>
            item.icon ? <WalletIconRenderer icon={item.icon} /> : null
          }
        />

        {showWalletProvider && (
          <Animated.View
            style={animatedStyle}
            // entering={SlideInDown}
            // exiting={SlideOutUp}
          >
            <FormDropdownComponent<AllWalletProviders>
              name="provider"
              submitCount={submitCount}
              validator={value => {
                if (!showWalletProvider) return undefined;

                if (isNullOrEmpty(value)) {
                  return 'Wallet Provider is Required!';
                }
                return undefined;
              }}
              data={walletProvidersData}
              placeholder={'select the provider'}
              renderItem={(item, selected) => (
                <WalletDropdownItem item={item} selected={selected} />
              )}
              renderLeftSelectedIcon={item =>
                item.icon ? <WalletIconRenderer icon={item.icon} /> : null
              }
            />
          </Animated.View>
        )}

        <FormDropdownComponent
          name="currency"
          submitCount={submitCount}
          validator={value => {
            if (isNullOrEmpty(value)) {
              return 'Currency is Required!';
            }
            return undefined;
          }}
          data={currenciesDropdownData}
          placeholder="select the currency"
          search={true}
        />

        <AppButton onPress={handleSubmit}>
          {isCreateWalletLoading ? (
            <AppActivityLoader size={'small'} color={colors.white} />
          ) : (
            'Create'
          )}
        </AppButton>
      </Column>
    </AppCard>
  );
};

export default WalletScreen;
