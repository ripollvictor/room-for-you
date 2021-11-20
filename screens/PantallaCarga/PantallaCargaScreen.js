import InicioScreen from '../Inicio'

const PantallaCargaScreen = ({navigation}) => {

    tiempoCarga()

    function irPagina () {
        navigation.navigate(InicioScreen)
    }

    function tiempoCarga(){
        setTimeout(() => {
            irPagina()
        }, 6000);
    }


}

export default InicioScreen