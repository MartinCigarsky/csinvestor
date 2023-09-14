import {Component, OnInit} from '@angular/core';
import {Investment} from "../../interfaces/investment";
import {InvestmentService} from "../../services/investment.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  investments: Investment[] = [];

  constructor(private investmentService: InvestmentService) {
  }
  ngOnInit(): void {
    console.log('tabulka')
    this.investmentService.getInvestments().subscribe((data) => {
      this.investments = data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
      console.log(this.investments);
    });
  }

  refresh(): void {
    this.investmentService.refreshInvestments(this.investments);
  }
}



