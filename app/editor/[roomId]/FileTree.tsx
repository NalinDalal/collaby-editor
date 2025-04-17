export default function FileTree() {
  return (
    <div className="p-2 w-48 border-r">
      <p className="font-bold">Files</p>
      <ul>
        <li>Main.{`<ext>`}</li>
      </ul>
    </div>
  );
}
