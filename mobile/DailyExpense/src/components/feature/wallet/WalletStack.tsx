import { StyleSheet, View } from 'react-native';
import WalletCard from './WalletCard';
import { Wallet } from '../../../types/wallet';

const WalletStack = ({ wallets }: { wallets: Wallet[] }) => {
  if (wallets.length === 0) return null;

  // We take the first two wallets to show the stack
  const frontWallet = wallets[0];
  const backWallet = wallets[1];
  const lastBackWallet = wallets[2];

  return (
    <View style={styles.stackWrapper}>
      {lastBackWallet && (
        <View style={styles.lastBackCardPosition}>
          <WalletCard wallet={lastBackWallet} isBackCard={true} />
        </View>
      )}

      {backWallet && (
        <View style={styles.backCardPosition}>
          <WalletCard wallet={backWallet} isBackCard={true} />
        </View>
      )}

      <View style={styles.frontCardPosition}>
        <WalletCard wallet={frontWallet} isBackCard={false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stackWrapper: {
    height: 260, // Total height of the stacked UI
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
    // marginHorizontal: 20,
  },
  lastBackCardPosition: {
    position: 'absolute',
    top: 0,
    transform: [{ scaleX: 0.8 }],
    zIndex: 1,
  },
  backCardPosition: {
    position: 'absolute',
    top: 15,
    transform: [{ scaleX: 0.9 }],
    zIndex: 2,
  },
  frontCardPosition: {
    position: 'absolute',
    top: 30, // This creates the "reveal" of the back card
    zIndex: 3,
  },
});

export default WalletStack;
