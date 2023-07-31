import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick }) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className="
                inline-flex
                w-full
                justify-center
                py-2
                px-4
                rounded-md
                text-gray-500
                bg-white
                hover:bg-gray-50
                shadow-sm
                ring-1
                ring-inset
                ring-gray-300
                focus:outline-offset-0" 
            >
                <Icon/>
        </button>
    );
}

export default AuthSocialButton;