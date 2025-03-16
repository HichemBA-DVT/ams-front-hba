
import { Component, OnInit } from '@angular/core';
import { Provider, ProviderService } from '../../../services/provider.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.css'
})
export class ProviderListComponent {

  providers: Provider[] = [];
  public urlUploadProviders = environment.urlUploadProviders;

  constructor(private providerService: ProviderService, private router: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('jwtToken')) {  // Delay Fetching Providers Until Login is Complete 
    this.loadProviders();
    }
  }

  loadProviders(): void {
    this.providerService.getProviders().subscribe({
      next: (data) => this.providers = data,
      error: (err) => console.error('Erreur lors du chargement des fournisseurs:', err)
    });
  }

 

    deleteProvider(id: number) {
      if (confirm('Are you sure you want to delete this provider?')) {
        this.providerService.deleteProvider(id).subscribe(() => {
          this.providers = this.providers.filter(p => p.id !== id); // Update the list
        });
      } else {throw new Error('Delete action canceled');}
    }

    updateProvider(id: number): void {
      this.router.navigate(['/update-provider', id]); // Navigate to the update form
    }

    
    



}
