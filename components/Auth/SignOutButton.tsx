import { signOut } from "lib/auth/nextAuth"

export default function SignOutButton({ session }) {
  if (session) {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
        style={{ display: "inline-block" }}
      >
        <button
          type="submit"
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
            fontFamily: "inherit",
            textTransform: "inherit",
            cursor: "pointer",
            marginRight: "2rem",
          }}
        >
          <span>Log Out</span>
        </button>
      </form>
    )
  }

  return null
}
