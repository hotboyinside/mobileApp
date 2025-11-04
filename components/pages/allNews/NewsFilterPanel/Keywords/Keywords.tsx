import { useSession } from '@/components/appProvider/session/SessionContext';
import { ThemedView } from '@/components/ThemedView';
import { isUserPremium } from '@/helpers/userStatus/isUserPremium';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderBottomSheet } from '../HeaderBottomSheet';
import { KeywordCreator } from './KeywordCreator';
import { LimitsOfKeywords } from './LimitsOfKeywords';
import { VisualOnlyKeywords } from './VisualOnlyKeywords';
import { WithVoiceOverKeywords } from './WithVoiceOverKeywords';

type KeywordsProps = {
	onClose: () => void;
};

export const Keywords = ({ onClose }: KeywordsProps) => {
	const { session } = useSession();
	const isPremiumUser = isUserPremium(session);

	return (
		<BottomSheetScrollView
			stickyHeaderIndices={[0]}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 120 }}
		>
			<HeaderBottomSheet headerLabel='Keywords' onCloseFilters={onClose} />
			<ThemedView style={styles.container}>
				<KeywordCreator
					isPremiumUser={isPremiumUser}
					onCloseKeywords={onClose}
				/>
				<VisualOnlyKeywords />
				<WithVoiceOverKeywords onCloseKeywords={onClose} />
				{!isPremiumUser && <LimitsOfKeywords />}
			</ThemedView>
		</BottomSheetScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 24,
		padding: 16,
		paddingBottom: 240,
	},
});
