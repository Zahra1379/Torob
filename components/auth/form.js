import {css} from "@emotion/react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {forwardRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Alert} from "react-bootstrap";
import {signIn} from "next-auth/react";

const cssAlias = css;

export const PasswordBox = forwardRef(({onChange, onBlur, name, className, id, value}, ref) => {
    const [visible, setVisible] = useState(false);

    return (<div className={'d-flex flex-row ' + className} id={id}>
        <input css={cssAlias`
              border: none;
              padding: 0;
              font-weight: inherit;
              line-height: inherit;
              font-size: inherit;
              color: inherit;
              background: transparent;
              width: 100%;

              &:focus {
                outline: none;
              }`}
               type={visible ? 'text' : 'password'} onChange={onChange} onBlur={onBlur} name={name}
               ref={ref} value={value}/>
        <button type="button" css={cssAlias`
              display: inline-block;
              font-weight: inherit;
              font-size: inherit;
              line-height: inherit;
              color: inherit;
              background: transparent;
              border: none;
              padding: 0;
              transition: all .2s ease-in-out;

              &:focus {
                border: none
              }
            `} onClick={() => setVisible(!visible)}>
            {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
        </button>
    </div>)
});
PasswordBox.displayName = 'PasswordBox';

export function SignupForm({onSuccess}) {

    const {register, formState: {errors}, handleSubmit} = useForm();
    const [serverSideErrors, setServerSideErrors] = useState([]);

    function onSubmit(data) {
        axios.post('/api/auth/signup', data)
            .then(res => {
                signIn('user-password', {redirect: false, username: data.username, password: data.password})
                    .then(() => {
                        if (onSuccess) onSuccess(res.data)
                    });
            })
            .catch(err => setServerSideErrors(err.response.data.errors))
    }

    return (<form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        {serverSideErrors.length > 0 && <Alert className="p-2" variant="danger">
            <ul className="m-0">{serverSideErrors.map((err, index) => <li key={index}>{err}</li>)}</ul>
        </Alert>}
        <label htmlFor="username">نام کاربری</label>
        <input id="username" className="form-control shadow-none my-2" {...register('username', {
            required: true,
        })}
               placeholder="نام کاربری را وارد کنید"/>
        {errors.username && <small className="text-danger">نام کاربری را وارد کنید</small>}
        <label htmlFor="email">ایمیل</label>
        <input id="email" className="form-control shadow-none my-2" {...register('email', {
            required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        })}
               placeholder="نام کاربری را وارد کنید"/>
        {errors.email?.type === 'required' && <small className="text-danger">ایمیل را وارد کنید</small>}
        {errors.email?.type === 'pattern' && <small className="text-danger">ایمیل وارد شده نامعتر است</small>}
        <label htmlFor="password">رمز عبور</label>
        <PasswordBox id="password" className="form-control my-2" {...register('password', {
            required: true, minLength: 8, validate: {
                hasUpperCase: value => /[A-Z]/.test(value),
                hasLowerCase: value => /[a-z]/.test(value),
                hasNumber: value => /\d/.test(value),
            }
        })}/>
        {errors.password?.type === 'required' && <small className="text-danger">رمز عبور را وارد کنید</small>}
        {errors.password?.type === 'minLength' &&
            <small className="text-danger">رمز عبور حداقل 8 کاراکتر باشد</small>}
        {errors.password?.type === 'hasUpperCase' &&
            <small className="text-danger">رمز عبور حداقل شامل یک حرف بزرگ باشد</small>}
        {errors.password?.type === 'hasLowerCase' &&
            <small className="text-danger">رمز عبور حداقل شامل یک حرف کوچک باشد</small>}
        {errors.password?.type === 'hasNumber' &&
            <small className="text-danger">رمز عبور حداقل شامل یک عدد باشد</small>}
        <button type="submit" className="btn bg-red text-white m-2 shadow-none">ثبت نام</button>
    </form>)
}

export function LoginForm({onSuccess}) {
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);

    function onSubmit(data) {
        signIn("user-password", {redirect: false, ...data})
            .then(res => {
                console.log(res)
                if (res.error) setError("نام کاربری یا رمز عبور اشتباه است")
                else if (onSuccess) onSuccess();
            });
    }

    return (<form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        {error && <Alert className="p-2" variant="danger">{error}</Alert>}
        <label htmlFor="username">نام کاربری</label>
        <input id="username" className="form-control shadow-none my-2" {...register('username')}
               placeholder="نام کاربری را وارد کنید"/>
        <label htmlFor="password">رمز عبور</label>
        <PasswordBox id="password" className="form-control my-2" {...register('password')}/>
        <button type="submit" className="btn bg-red text-white m-2 shadow-none">ورود</button>
    </form>)
}