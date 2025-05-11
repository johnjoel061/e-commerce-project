import React, { useState } from 'react'
import { Input } from '../ui/input'

interface MultiTextProps {
    placeholder: string
    value: string[]
    onChange: (value: string) => void
    onRemove: (value: string) => void
}

const MultiText: React.FC<MultiTextProps> = ({
    placeholder,
    value,
    onChange,
    onRemove,
}) => {
    const [inputValue, setInputValue] = useState("");
    const addTag = (item: string) => {
        onChange(item);
        setInputValue("");
    }

  return (
    <Input
    placeholder={placeholder}
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputValue)
        }
    }}
    />
  )
}

export default MultiText
