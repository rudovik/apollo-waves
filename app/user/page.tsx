import { auth } from "lib/auth/nextAuth"

export default async function UserPage() {
  const {
    user: { email, image, name },
  } = await auth()
  return (
    <>
      <div className="userInfoPanel">
        <h1 className="userInfoPanel__title">User information</h1>
        <span>{name}</span>
        <span>{image}</span>
        <span>{email}</span>
      </div>
    </>
  )
}
