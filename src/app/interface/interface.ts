export interface SideNavToggle {

    screenWidth: number,
    collapsed: boolean
}

export interface Financias{
    _id: number,
    categoria: String,
    descricao: String,
    data: Date,
    preco: number,
    isPago: String
}