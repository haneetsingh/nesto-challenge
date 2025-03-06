import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  required?: boolean;
  type?: string;
  pattern?: string;
  disabled?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  errorMessage,
  required = false,
  type = "text",
  pattern,
  disabled = false,
  placeholder,
}) => {
  const t = useTranslations();

  return (
    <FormGroup>
      <Label htmlFor={name}>{t(label)}</Label>
      <InputGroup>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          pattern={pattern}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          haserror={!!errorMessage ? "true" : "false"}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputGroup>
    </FormGroup>
  );
};

export default InputField;

const FormGroup = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
  width: 100px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input<{ haserror?: string }>`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ haserror }) => (haserror === "true" ? "red" : "#ccc")};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: ${({ haserror }) => (haserror === "true" ? "red" : "#007bff")};
    outline: none;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
