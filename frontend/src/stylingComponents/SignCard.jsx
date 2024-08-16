export function SignCard({heading,about,children,buttonText,linkText,linkUrl,to}) {
  return (
    <div className="bg-gray-400 h-screen w-screen items-center flex justify-center">
      <div className="bg-white rounded-lg shadow-md max-w-md p-6">
        <div className="font-bold text-3xl text-center mb-2"> {heading} </div>
        <div className="text-gray-500 mt-1 mb-7"> {about} </div>
        <div> {children} </div>
        <button className="mt-4 bg-black rounded-lg w-full text-white p-1.5"> {buttonText} </button>
        <div className="mt-1.5 flex gap-1 justify-center">
            <div> {linkText} </div>
            <a href={to} className="underline text-gray-600"> {linkUrl} </a>
        </div>
      </div>
    </div>
  );
}
