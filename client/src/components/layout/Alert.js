import {connect} from "react-redux"
import React from 'react'
import PropTypes from 'prop-types'
////////////// rafcp ///////////////
const Alert = ({alerts}) => alerts !== null && alerts.length>0 && alerts.map(alert=>(
   
     <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>
    
))

Alert.propTypes = {
    alerts:PropTypes.array.isRequired
}
const mapstatetoprop=state=>({
    alerts:state.alert
})
export default connect(mapstatetoprop)(Alert)