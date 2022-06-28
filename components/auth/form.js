export function SignupForm() {

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form className="form-signup" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Username" />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    )
}

export function LoginForm() {

}