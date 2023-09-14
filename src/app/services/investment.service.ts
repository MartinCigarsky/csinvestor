import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {addDoc, collection, collectionData, doc, Firestore, updateDoc} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {Investment} from "../interfaces/investment";


@Injectable({providedIn: 'root'})
export class InvestmentService {

  constructor(private db: Firestore, private http: HttpClient) {
  }

  getInvestments(): Observable<any> {
    let investments = collection(this.db, 'investments');
    return collectionData(investments, {idField: 'id'});
  }

  addInvestment(formValue: any) {
    let itemSteamUrl = formValue.steamUrl;
    const index = itemSteamUrl.indexOf("730/");
    let extractedString = itemSteamUrl.substring(index + 4);
    let steamCallUrl = 'https://steamcommunity.com/market/priceoverview/?currency=3&appid=730&market_hash_name=' + extractedString;
    console.log(steamCallUrl)

    this.getMarketData(steamCallUrl).subscribe(response => {
      console.log(response.lowest_price)
      let newInvestment = {
        name: formValue.name,
        steamUrl: steamCallUrl,
        buyPrice: +formValue.buyPrice,
        currentPrice: parseFloat(response.lowest_price.replace('€', '').replace(',', '.')),
        quantity: +formValue.quantity,
        investedAt: new Date(formValue.investedAt),
        history: [{date: new Date(), price: parseFloat(response.lowest_price.replace('€', '').replace(',', '.'))}]
      };

      let investments = collection(this.db, 'investments');
      return addDoc(investments, newInvestment);
    });

  }

  refreshInvestments(investments: Investment[]) {
    let index = 1;
    investments.forEach(investment => {
      setTimeout(() => {
        this.getMarketData(investment.steamUrl).subscribe(response => {
          investment.currentPrice = parseFloat(response.lowest_price.replace('€', '').replace(',', '.'));
          investment.history.push({
            date: new Date(),
            price: parseFloat(response.lowest_price.replace('€', '').replace(',', '.'))
          });
          let docRef = doc(this.db, 'investments', investment.id);
          let inv: any = investment;
          updateDoc(docRef, inv);
        })
        console.log(investment.name + " updated");
      }, 4000 * index);
      index = index + 1;
    })
  }

  getMarketData(steamUrl: string): Observable<any> {
    return this.http.get(steamUrl);
  }
}
