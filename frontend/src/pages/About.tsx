export default function About() {
  return (
    <div>
      <h2>About This Blog App</h2>
      <p>
        This is a simple React + TypeScript blogging platform that allows users
        to register, login, create blogs, edit blogs, and delete blogs.
      </p>

      <p>
        The project uses database in backend to simulate a real database and
        token-based login system. It is designed to teach beginners how a real
        world full-stack app works.

        Am happy and love to share it with you!
      </p>

      <ul>
        <li>🔐 Secure user registration & login</li>
        <li>📝 Create blog posts</li>
        <li>✏ Edit your own posts</li>
        <li>🔍 View posts by other users</li >
        <li>🛠️ Edit your profile</li>
        <li>📤 Logout securely</li>
        <li>🗑 Delete your own posts</li>
        <li>📄 Read all public posts</li>
      </ul>

      <p>Feel free to modify and expand this project.</p>
    </div>
  );
}
