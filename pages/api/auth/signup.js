import {User} from "../../../models";
import {hashPassword} from "../../../lib/auth";
import db from "../../../lib/db";
import {checkEmail, checkPassword} from "../../../lib/validation/auth-validations";

export default async function SignupHandler(req, res) {
    if (req.method === "POST") {
        await db();
        const {username, password, email} = req.body;
        const errors = [];
        if (!checkPassword(password))
            errors.push("رمز عبور باید حداقل 8 کاراکتر باشد و شامل حروف بزرگ و کوچک و اعداد باشد");
        if (!checkEmail(email))
            errors.push("ایمیل وارد شده معتبر نمی باشد");
        if (errors.length) {
            res.status(400).json({errors});
            return;
        }
        const userCheck = await User.findOne({username});
        if (userCheck) {
            res.status(400).json({errors: ["نام کاربری وارد شده تکراری است"]});
            return;
        }
        const user = await User.create({username, password: await hashPassword(password), email, roles: ["owner", "user"]});
        res.status(201).json(user)
    }
}
