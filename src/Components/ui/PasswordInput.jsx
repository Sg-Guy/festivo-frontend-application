import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "./Input";

const PasswordInput = ({
  value,
  onChange,
  error,
  label = "Mot de passe",
  placeholder = "Entrez votre mot de passe",
  isRequired = false,
  name = "password",
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      isRequired={isRequired}
      className={className}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label={
            showPassword
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
};

export default PasswordInput;