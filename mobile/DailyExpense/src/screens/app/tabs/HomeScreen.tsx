import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppScreen from '../../../components/AppScreen';
import AppText from '../../../components/Text';
import AppBar from '../../../components/AppBar';
import { TopDashboardCategory } from '../../../types/dashboard';
import { getDashboardService } from '../../../services/dashboard.service';
import { useSnackbarStore } from '../../../store/snackbarStore';
import { Transaction } from '../../../types/transaction';
import { AppIconButton } from '@components/Button';
import AppIcon from '@components/Icon';
import { Column, Row } from '@components/Layout';
import { useTheme } from '../../../theme/ThemeProvider';
import { colors } from '../../../theme/colors';
import { ThemeType } from '../../../theme';
import { useSharedValue } from 'react-native-reanimated';
import * as Progress from 'react-native-progress';
import { getCategoryColor } from '../../../utils/category.utils';
import { CategoryColor } from '../../../types/category';
import TransactionTile from '@components/feature/transaction/TransactionTile';
import AppActivityLoader from '@components/Loader';
import { getCurrencySymbol } from '../../../utils/currency';
import { useDashboardStore } from '../../../store/useDashboardStore';
import BalanceComponent from '@components/feature/wallet/BalanceComponent';

const HomeScreen = () => {
  const { theme } = useTheme();
  const showSnackbar = useSnackbarStore(s => s.showSnackbar);
  const updateDashboard = useDashboardStore((s) => s.updateDashboard);
  const dashboardData = useDashboardStore(s => s.data);

  const totalBalance = dashboardData?.totalBalance ?? 0;
  const baseCurrency = dashboardData?.baseCurrency ?? 'PKR';
  const topCategories = dashboardData?.topCategories ?? [];
  const recentTransactions = dashboardData?.recentTransactions ?? [];

  const [isInitialLoading, setInitialLoading] = useState<boolean>(false);

  const getDashboardData = async () => {
    setInitialLoading(true);

    const res = await getDashboardService();

    if (res.success) {
      const dashboardData = res.data;

      if (!dashboardData) {
        return showSnackbar("Sorry! unable to show your Transaction's Data", {
          type: 'error',
        });
      }

      updateDashboard(dashboardData);
      setInitialLoading(false);

    } else {
      setInitialLoading(false);
      showSnackbar(res.message, { type: 'error' });
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <AppScreen>
      <AppBar
        title="Welcome"
        showBackButton={false}
        height={80}
        leading={<AppIconButton size={30} onPress={() => {}} name="menu" />}
      />

      {/* Available Balance */}
      <Column style={[styles.availableBalanceContainer]}>
        <Column crossAxisAlignment="center" style={{ paddingTop: 50 }}>
          <AppText color={theme.colors.primary} fontSize={theme.fontSize.small}>
            Available Balance
          </AppText>

          <BalanceComponent
            balance={totalBalance}
            currency={baseCurrency}
          />
        </Column>
      </Column>

      {/* Top Categories and Recent Transactions */}
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.secondaryBackground,
          justifyContent: 'center',
        }}
      >
        {isInitialLoading && (
          <AppActivityLoader
            color={colors.white}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}

        {topCategories.length > 0 && (
          <>
            {/* Top Categories */}
            <Row spacing={10} style={[styles.topCategoriesContainer]}>
              {topCategories.length > 0 &&
                topCategories.map((value, index) => (
                  <TopCategoryContainer
                    key={index}
                    topCategory={value}
                    theme={theme}
                  />
                ))}
            </Row>
          </>
        )}

        {recentTransactions.length === 0 ? (
          <AppText style={{ textAlign: 'center' }}>
            No transactions yet!
          </AppText>
        ) : (
          <ScrollView contentContainerStyle={{ paddingTop: 70 }}>
            {/* Recent Transactions */}
            <AppText
              fontSize={theme.fontSize.medium}
              style={{ marginLeft: 10, marginBottom: 10 }}
            >
              My transactions
            </AppText>
            {recentTransactions.map((transaction, index) => (
              <TransactionTile
                key={index}
                transaction={transaction}
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </AppScreen>
  );
};

type TopCategoryContainerProps = {
  topCategory: TopDashboardCategory;
  theme: ThemeType;
};
const TopCategoryContainer = ({
  topCategory,
  theme,
}: TopCategoryContainerProps): React.JSX.Element => {
  // const animatedPercentage = useSharedValue(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // animatedPercentage.value = (topCategory.percentage / 100);
    setProgress(topCategory.percentage / 100);
  }, [topCategory.percentage]);

  return (
    <View
      style={[
        styles.topCategoryContainer,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Progress.Circle
        borderWidth={0}
        size={80} // Slightly larger for better visual
        color={getCategoryColor(topCategory.color as CategoryColor)}
        progress={progress}
        showsText={false} // Disable internal text
        thickness={13}
        strokeCap="round"
        animated={true}
      />
      {/* Manually absolute center the text */}
      <View
        style={[StyleSheet.absoluteFill, styles.centerTopCategoryPercentage]}
      >
        <AppText
          style={{
            fontSize: theme.fontSize.small,
            textAlign: 'center',
          }}
        >
          {`${topCategory.percentage}%`}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  availableBalanceContainer: {
    height: 180,
    // alignItems: 'center',
  },
  topCategoriesContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    overflow: 'visible',
    position: 'absolute',
    right: 0,
    left: 0,
    top: -50,
    zIndex: 10,
  },
  topCategoryContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centerTopCategoryPercentage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
