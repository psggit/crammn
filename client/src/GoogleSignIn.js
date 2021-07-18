const GoogleSignIn = () => (
  <div>
    <div
      id="g_id_onload"
      data-client_id="86586798573-o43mavsuo9aclh25qb2jn9vkcnpo63bt.apps.googleusercontent.com"
      data-context="use"
      data-ux_mode="popup"
      data-login_uri="https://crammn.com/auth/google/callback"
      data-nonce=""
      data-auto_prompt="false"
    ></div>

    <div
      className="g_id_signin center"
      data-type="standard"
      data-shape="pill"
      data-theme="filled_blue"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
      data-width="300px"
    ></div>
  </div>
)

export default GoogleSignIn
