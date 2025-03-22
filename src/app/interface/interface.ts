export interface SideNavToggle {

    screenWidth: number,
    collapsed: boolean
}

export interface Financias{
    id: String,
    categoria: String,
    descricao: String,
    data: Date,
    preco: number,
    isPago: String
}