const Notification = ({postType,showNotification}) => (
        <div className={`fixed top-17 right-[-1px] bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-500 ${showNotification ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-semibold">{postType} listing created successfully!</p>
          </div>
        </div>
      );

export default Notification;