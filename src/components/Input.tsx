interface InputProps {
    title: string
    type?: 'text' | 'number'
    value?: any
    somenteLeitura?: boolean
    onChange?: (e: any) => void
}

export default function Input(props: InputProps) {
    return (
        <div className="flex flex-col">
            <label className="mb-2">{props.title}</label>
            <input 
                type={props.type ?? 'text'} 
                value={props.value}
                readOnly={props.somenteLeitura}
                onChange={props.onChange}
                className={`
                    border border-purple-500 rounded-lg
                    focus: outline-none bg-gray-50
                    px-5 py-2
                    ${props.somenteLeitura ? '' : 'focus:bg-white'}
                `}
                />
        </div>
    )
}