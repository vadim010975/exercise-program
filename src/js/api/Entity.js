import createRequest from "./createRequest.js";
import { HOST } from "../data.js";

/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
export default class Entity {

  static host = HOST;
  
  static URL = Entity.host;
  
  /**
   * Запрашивает с сервера список данных.
   * */
  static async list(data = undefined, callback) {
    await createRequest({
      url: this.URL,
      data,
      method: 'GET', 
      callback,
    });
  }

  static set(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'POST', 
      callback,
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'PUT',
      callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      data,
      method: 'DELETE',
      callback,
    });
  }
}
