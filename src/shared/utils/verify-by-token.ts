import Verification, {verificationTypes} from "@models/Verification";
import User from "@models/User";

export const verifyByToken = async (token: string, verificationType: verificationTypes) => {
    const verificationDoc = await Verification.findOne({token});
    if (!verificationDoc || verificationDoc.data.for !== verificationType)
        return false;
    await verificationDoc.remove();
    return User.findOne({email: verificationDoc.data.email});
}