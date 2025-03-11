import { useAuth } from "react-oidc-context";
import { Navbar, Footer } from "../components";

function SessionInfo() {
  const auth = useAuth();

  const signOutRedirect = () => {
    localStorage.clear();
    sessionStorage.clear();
    const clientId = "1dtip13etspsn0j7tjrjs6nqjt";
    const logoutUri = "http://localhost:3000/";
    const cognitoDomain = "https://us-east-18feberh4w.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }


  return (
    <>
      <Navbar />
        <div>
          <pre> Hello: {auth.user?.profile.email} </pre>
          <pre> ID Token: {auth.user?.id_token} </pre>
          <pre> Access Token: {auth.user?.access_token} </pre>
          <pre> Refresh Token: {auth.user?.refresh_token} </pre>
          <button onClick={() => signOutRedirect()}>Sign out</button>
        </div>
      <Footer />
    </>
  )
}

export default SessionInfo