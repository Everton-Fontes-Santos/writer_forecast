const mongoose = require('mongoose');
const validator = require('validator')

const { Schema } = mongoose;

const forecastSchema = new Schema({
  value:  Number, // String is shorthand for {type: String}
  prev_value: Number,
  last_close:   Number,
  date: { type: Date, default: Date.now },
  timeframe: String,
});

const ForecastModel = mongoose.model('Forecasts', forecastSchema)

module.exports = class Forecast {
    constructor(){
        this.forecastData = null
        this.errors = []
        this.forecast = null
    }

    cleanUp(){
        if(this.forecastData.value !== typeof 'number') this.forecastData.value = Number(this.forecastData.value)
        if(this.forecastData.prev_value !== typeof 'number') this.forecastData.prev_value = Number(this.forecastData.prev_value)
        if(this.forecastData.last_close !== typeof 'number') this.forecastData.last_close = Number(this.forecastData.last_close)
        if(this.forecastData.timeframe !== typeof 'string') this.forecastData.timeframe = String(this.forecastData.timeframe).toLowerCase()
        if(!this.forecastData.date){
            this.forecastData.date = new Date().setSeconds(0)
        } else{
            this.forecastData.date = new Date(this.forecastData.date).setSeconds(0)
        }
        this.forecastData.date = new Date(this.forecastData.date).setMilliseconds(0)
    }

    validate(forecastData){
        this.forecastData = forecastData
        this.cleanUp()

        //prev and value need to be greater than 0
        if(this.forecastData.value <= 0 || this.forecastData.prev_value <= 0) this.errors.push(
            "value or prev_value need to be greater than 0"
        )
        //prev and value need to be greater than 0
        if(this.forecastData.last_close <= 0) this.errors.push(
            "last_close need to be greater than 0"
        )

        //timeframe need to exist
        if(!this.forecastData.timeframe) this.errors.push(
            "TimeFrame need a value: m1, m5, m15, h1, d1"
        )
        const accepted_timeframes = ['m1','m5', 'm15', 'h1', 'd1']

        // check if timeframe exists
        if(!accepted_timeframes.includes(this.forecastData.timeframe)) this.errors.push(
            'timeframe need to be one of the list [ m1, m5, m15, h1, d1 ]'
        )
    }

    hasErrors(){
        return this.errors.length > 0
    }
    getErrors(){
        return this.errors
    }

    async createForecast(forecastData){
        this.validate(forecastData)
        if(this.hasErrors()) return
        try{
            this.forecast = await ForecastModel.create(this.forecastData)
            return this.forecast
        }catch(err){
            console.log(err)
        }
    }

    async editForecast(forecastData){
        this.validate(forecastData)
        if(this.hasErrors()) return
        try{
            this.forecast = await ForecastModel.findOneAndUpdate(
                { date: forecastData.date }, 
                this.forecastData, 
                { new: true}
            )
            return this.forecast
        }catch(err){
            console.log(err)
        }
    }

    async getForecastByDate(date){
        const new_date = new Date(date).setSeconds(0,0)
        if(this.hasErrors()) return
        try{
            this.forecast = await ForecastModel.findOne(
                { date: new_date },
            )
            return this.forecast
        }catch(err){
            console.log(err)
        }
    }

    async deleteForecastByDate(date){
        const new_date = new Date(date).setSeconds(0,0)
        if(this.hasErrors()) return
        try{
            this.forecast = await ForecastModel.deleteOne(
                { date: new_date }
            )
            return this.forecast
        }catch(err){
            console.log(err)
        }
    }

    static async getAllForecast(){
        try{
            return await ForecastModel.find()
        }catch(err){
            console.log(err)
        }
    }
}