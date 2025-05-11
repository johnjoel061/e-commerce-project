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

  return (
    <Input
    placeholder={placeholder}
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    />
  )
}

export default MultiText
