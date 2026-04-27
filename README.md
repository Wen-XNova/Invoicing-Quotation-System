flowchart TD
    subgraph Frontend [React Frontend]
        direction TB
        App[App.jsx] --> Invoice[Invoice.jsx]
        App --> Quotation[Quotation.jsx]
        
        Invoice --> IH[InvoiceHeader.jsx]
        Invoice --> II[InvoiceItems.jsx]
        Invoice --> IS[InvoiceSummary.jsx]
        
        Quotation --> QH[QuotationHeader.jsx]
        Quotation --> QI[QuotationItems.jsx]
        Quotation --> QS[QuotationSummary.jsx]
    end

    subgraph APILayer [.NET Web API Layer]
        direction TB
        Auth[ApiKey Security] --> Controller[DocumentController.cs]
        Controller --> Validators[FluentValidation \n InvoiceDtoValidator / QuotationDtoValidator]
        Validators --> DTOs[DTOs \n InvoiceDto / QuotationDto]
    end

    subgraph ServiceLayer [Business Logic Layer]
        direction TB
        Interface[IDocumentService] --> Service[DocumentService.cs]
    end

    subgraph DataLayer [Entity Framework Core]
        direction TB
        Context[AppDbContext.cs] --> Models[Models \n Invoice / Quotation]
    end

    Database[(SQL Server)]

    %% Connections
    Invoice -- HTTP Requests --> Auth
    Quotation -- HTTP Requests --> Auth
    
    Controller -- Passes Data --> Interface
    Service -- Uses --> Context
    Context -- Reads/Writes --> Database

<img width="1465" height="794" alt="image" src="https://github.com/user-attachments/assets/50fc35d4-5347-4baa-9292-deb363aec83f" />

<img width="1200" height="856" alt="image" src="https://github.com/user-attachments/assets/03301dfb-0387-422f-a25b-211ec4ffa878" />

<img width="872" height="849" alt="image" src="https://github.com/user-attachments/assets/406c89f0-3007-48de-82c9-f000a34eb400" />

<img width="707" height="784" alt="image" src="https://github.com/user-attachments/assets/b884db29-25da-45bd-8955-0071b3f3be50" />

<img width="1144" height="513" alt="image" src="https://github.com/user-attachments/assets/1ed4e1b0-a71c-4a7c-b824-8d9573e94676" />

<img width="570" height="400" alt="image" src="https://github.com/user-attachments/assets/ef0cefef-063f-4b25-8073-183014461842" />

<img width="1177" height="507" alt="image" src="https://github.com/user-attachments/assets/c8e84cce-1f9f-46c2-8d09-ef8cb735c779" />

