type Props = { variant?: "dark" | "light" };

export function CopyrightFooter({ variant = "dark" }: Props) {
    return (
        <p className={`screen-credit ${variant}`}>
            © 2026 Wanessa de Souza Fernandes. Todos os direitos reservados.
        </p> 
    );
}