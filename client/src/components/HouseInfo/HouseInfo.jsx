import React from 'react';
import './HouseInfo.scss';

export class HouseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            houseType: 'Квартира',
            houseArea: 0,
            houseRoom: 1
        }
        this.onHouseInfoSave = this.onHouseInfoSave.bind(this);
        this.onChangeHouseType = this.onChangeHouseType.bind(this);
        this.onChangeHouseArea = this.onChangeHouseArea.bind(this);
        this.onChangeHouseRoom = this.onChangeHouseRoom.bind(this);

    }

    onHouseInfoSave(e) {
        e.preventDefault();
        console.log(localStorage.token+'\n',
            this.state.houseType +'\n',
            this.state.houseArea + '\n',
            this.state.houseRoom + '\n')

        const axios = require('axios');
        
        this.data = {
            homeType: this.state.houseType,
            homeSize: this.state.houseArea,
            roomsNumber: this.state.houseRoom
        }

        axios.post('http://localhost:5000/api/profile/home', this.data, {
            headers: {
                'x-auth-token': localStorage.token,
                'Content-type': 'application/json'
            }
          }
          )
          .then( response => {
              console.log(response);
              window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    onChangeHouseType(e){
        const houseType = e.currentTarget.value;
        this.setState( {houseType });
    }
    onChangeHouseArea(e){
        const houseArea = e.currentTarget.value;
        this.setState( { houseArea });
    }
    onChangeHouseRoom(e){
        const houseRoom = e.currentTarget.value;
        this.setState( { houseRoom });
    }

    render() {
        return(
            <form onSubmit={this.onHouseInfoSave} className={ this.props.isVisibleInfo ? 'house_info house_display':'house_info' } >
                <label className="house_text">Тип житла</label>
                    <select className="house_type" onChange={this.onChangeHouseType}>
                        <option>Квартира</option>
                        <option>Будинок</option>
                    </select><br/>
                <label className="house_text">Площа(м²)</label>
                    <input onChange={this.onChangeHouseArea} type="number" name="" className="house_area"/><br/>
                <label className="house_text">Кількість кімнат</label>
                    <input onChange={this.onChangeHouseRoom} type="number" name="" className="house_area house_room"/><br/>
                <button className="house_save" >Зберегти</button>
            </form>
        );
    }
}