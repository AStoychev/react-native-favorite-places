import { useState } from "react";

import { View, Text, Image, Alert, StyleSheet } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";

import OutlineButton from "../UI/OutlineButton";

import { Colors } from "../../constants/colors";

function ImagePicker({ onTakeImage }) {
    const [pickedImage, setPickedImage] = useState();

    // For iOS
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficiant Permissions!',
                'You need to grant camera permissions to use this app.'
            );
            return false;
        }
        return true;
    }
    // For iOS
    async function takaImageHandler() {
        // For iOS
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        // For iOS
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri)
        // setPickedImage(image.uri);
    }

    let imagePreview = <Text>No image taken yet!</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>{imagePreview}</View>
            <OutlineButton icon="camera" onPress={takaImageHandler}>Take Image</OutlineButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});