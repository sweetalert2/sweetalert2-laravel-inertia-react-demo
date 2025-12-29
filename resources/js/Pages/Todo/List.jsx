export default function TodoList({ user }) {
  return (
    <>
      {user ? (
        <h1 className="text-3xl font-bold underline">Welcome back, {user.name}!</h1>
      ) : (
        <h1 className="text-3xl font-bold underline">Hello Guest!</h1>
      )}
    </>
  )
}
