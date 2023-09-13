import { Component } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {InvestmentService} from "../../../services/investment.service";

@Component({
  selector: 'app-add-new-investment',
  templateUrl: './add-new-investment.component.html',
  styleUrls: ['./add-new-investment.component.css']
})
export class AddNewInvestmentComponent {
  constructor(private modalService: NgbModal, private investmentService: InvestmentService) {}


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.investmentService.addInvestment(form.value);
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
