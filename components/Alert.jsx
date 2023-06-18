
const Alert = ({ children }) => {
    return (
        <div
            className="mb-4 rounded-lg bg-red-100 px-6 py-2 text-base text-red-700"
            role="alert">
            {children}
        </div>
    )
}

export default Alert
