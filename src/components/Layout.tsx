interface LayoutProps {
    children: any
}

export default function Layout(props: LayoutProps){
    return (
        <div>
            {props.children}
        </div>
    )
}