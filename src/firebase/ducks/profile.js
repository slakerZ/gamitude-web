import { getByFirebase } from "../../sdk/user/get";
import { createUser } from "../../sdk/user/post";

export const getUserProfile = async firebaseId => {
    try {
        const userProfile = await getByFirebase()(firebaseId);
        return userProfile;
    } catch (error) {
        console.error(`Error getting profile: ${JSON.stringify(error)}`);
        return null;
    }
};

export const assureUserProfile = async user => {
    try {
        const profile = await getUserProfile(user.uid);
        if (!profile) {
            const { email, uid: firebaseId } = user;
            console.log(user);
            return await createUser()({
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
