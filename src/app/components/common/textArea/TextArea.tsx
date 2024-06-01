'use client';
import { Text } from '@/app/components/common/index';
import { poppins } from '@/app/fonts';
import {
  TextAreaContainer,
  TextAreaComponent,
  ErrorContainer,
} from './TextArea.styled';

interface TextAreaProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeHolder: string;
  labelText: string;
  value?: string;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function TextArea({
  onChange,
  placeHolder,
  labelText,
  value,
  className,
  error = false,
  errorMessage,
}: TextAreaProps) {
  return (
    <TextAreaContainer className={className}>
      <Text
        htmlTag={'span'}
        type={'heading-regular'}
        color={'var(--text-primary)'}
        className="label-text-area"
      >
        {labelText}
      </Text>
      <TextAreaComponent
        $isError={error}
        className={poppins.className}
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
      />

      {error ? (
        <ErrorContainer>
          <Text
            htmlTag={'span'}
            type={'paragraph-small'}
            color={'var(--red-default)'}
          >
            {errorMessage}
          </Text>
        </ErrorContainer>
      ) : (
        ''
      )}
    </TextAreaContainer>
  );
}