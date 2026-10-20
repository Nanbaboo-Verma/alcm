const Card = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-16">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Card;
