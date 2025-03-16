import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProviderService } from '../../../services/provider.service';


@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css'],
  standalone: false
})
export class AddProviderComponent implements OnInit {
  selectedFile!: File;

  constructor(private providerService: ProviderService, private router: Router) { }
  ngOnInit() {
  }
  
    //Gets called when the user selects an image
  public onFileChanged(event:any) {
    //Select File
    this.selectedFile = event.target.files[0];
    }


// ✅ Méthode de soumission du formulaire avec ngForm
onSubmit(providerForm: NgForm) {
  console.log("🟢 Données du formulaire : ", providerForm.value);

  if (!providerForm.valid) {
    console.error("🚨 Le formulaire contient des erreurs !");
    return;
  }

  // ✅ Mise à jour de l'objet provider avec les données du formulaire
 // this.provider = { ...this.provider, ...providerForm.value };
  
  const providerFormData = new FormData();
  providerFormData.append('name', providerForm.value.name);
  providerFormData.append('email', providerForm.value.email);
  providerFormData.append('address', providerForm.value.address);
  providerFormData.append('phone_number', providerForm.value.phone_number);
  providerFormData.append('logo', this.selectedFile,this.selectedFile.name);
  
  
  console.log("🟢 Données du fournisseur prêtes à l'envoi : ");
  providerFormData.forEach((value, key) => {
    console.log(`${key}:`, value);
  });

  this.providerService.addProvider(providerFormData).subscribe({
    next: (response) => {
      console.log("🟢 Fournisseur ajouté avec succès", response);
      this.router.navigate(['providers']);
    },
    error: (error) => {
      console.error("🚨 Erreur lors de l'ajout du fournisseur", error);
    }
  });
}



}
