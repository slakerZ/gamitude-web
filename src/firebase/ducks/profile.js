export const getUserProfile = async (firebaseId, sdk) => {
    try {
        const userProfile = await sdk.user.getByFirebase(firebaseId);
        return userProfile;
    } catch (error) {
        console.error(`Error getting profile: ${JSON.stringify(error)}`);
        return null;
    }
};

export const assureUserProfile = async (user, sdk) => {
    try {
        const profile = await getUserProfile(user.uid, sdk);
        if (!profile) {
            const { displayName, email, photoURL, uid: firebaseId } = user;
            return await sdk.user.createUser({
                displayName,
                avatarUrl: photoURL,
                email,
                firebaseId,
            });
        }
        return profile;
    } catch (e) {
        console.error(`Assure user profile error: ${e}`);
        return null;
    }
};
