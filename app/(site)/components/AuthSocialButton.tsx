import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    icon: IconType;
    text: string;
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick, text }) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className="
                items-center
                inline-flex
                gap-2
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
               {text} <Icon/>
        </button>
    );
}

export default AuthSocialButton;