import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useSession } from '@/components/appProvider/session/SessionContext';

export default function SearchScreen() {
	const { signOut } = useSession();

	return (
		<ThemedView>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='textMd'>Welcome!</ThemedText>
				<HelloWave />
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='textSm'>Step 1: Try it</ThemedText>
				<ThemedText>
					Edit <ThemedText type='textSm'>app/(tabs)/index.tsx</ThemedText> to
					see changes. Press{' '}
					<ThemedText type='textSm'>
						{Platform.select({
							ios: 'cmd + d',
							android: 'cmd + m',
							web: 'F12',
						})}
					</ThemedText>{' '}
					to open developer tools.
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='textSm'>Step 2: Explore</ThemedText>
				<ThemedText>
					{`Tap the Explore tab to learn more about what's included in this starter app.`}
				</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='textSm'>Step 3: Get a fresh start</ThemedText>
				<ThemedText>
					{`When you're ready, run `}
					<ThemedText type='textSm'>npm run reset-project</ThemedText> to get a
					fresh <ThemedText type='textSm'>app</ThemedText> directory. This will
					move the current <ThemedText type='textSm'>app</ThemedText> to{' '}
					<ThemedText type='textSm'>app-example</ThemedText>.
				</ThemedText>
				<Button title='Log out' onPress={() => signOut()} />
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});
