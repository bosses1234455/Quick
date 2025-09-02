
function ErrorDisplay({ message }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {message}
      </div>
    </div>
  );
}

export default ErrorDisplay