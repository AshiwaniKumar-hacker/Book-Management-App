function Loader() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-600 text-lg font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loader;