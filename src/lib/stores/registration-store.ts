import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalDetails {
  // Private user fields
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  aviationExperience?: string;
  licenseNumber?: string;
  medicalClass?: string;
  emergencyContactName?: string;
  emergencyContactRelationship?: string;
  emergencyContactPhone?: string;
  
  // Commercial user fields
  organizationName?: string;
  organizationType?: string;
  registrationNumber?: string;
  taxId?: string;
  website?: string;
  fleetSize?: string;
  operations?: string[];
  contactPerson?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface VerificationData {
  // Add verification fields as needed
  [key: string]: unknown;
}

export interface DocumentsData {
  // Add document fields as needed
  [key: string]: unknown;
}

export interface RegistrationState {
  // Current step
  currentStep: number;
  
  // User type selection
  userType: 'private' | 'commercial' | null;
  
  // Step data
  personalDetails: PersonalDetails | null;
  verificationData: VerificationData | null;
  documentsData: DocumentsData | null;
  
  // Clerk user ID (set after successful signup)
  clerkUserId: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  setUserType: (type: 'private' | 'commercial') => void;
  setPersonalDetails: (details: PersonalDetails) => void;
  setVerificationData: (data: VerificationData) => void;
  setDocumentsData: (data: DocumentsData) => void;
  setClerkUserId: (id: string) => void;
  resetRegistration: () => void;
  
  // Validation helpers
  canProceedToStep: (step: number) => boolean;
  isStepComplete: (step: number) => boolean;
}

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      userType: null,
      personalDetails: null,
      verificationData: null,
      documentsData: null,
      clerkUserId: null,
      
      // Actions
      setCurrentStep: (step: number) => set({ currentStep: step }),
      
      setUserType: (type: 'private' | 'commercial') => {
        set({ 
          userType: type,
          currentStep: 2,
          // Reset subsequent steps when user type changes
          personalDetails: null,
          verificationData: null,
          documentsData: null,
          clerkUserId: null
        });
      },
      
      setPersonalDetails: (details: PersonalDetails) => {
        set({ 
          personalDetails: details,
          currentStep: 3
        });
      },
      
      setVerificationData: (data: VerificationData) => {
        set({ 
          verificationData: data,
          currentStep: 4
        });
      },
      
      setDocumentsData: (data: DocumentsData) => {
        set({ 
          documentsData: data,
          currentStep: 5
        });
      },
      
      setClerkUserId: (id: string) => {
        set({ clerkUserId: id });
      },
      
      resetRegistration: () => {
        set({
          currentStep: 1,
          userType: null,
          personalDetails: null,
          verificationData: null,
          documentsData: null,
          clerkUserId: null,
        });
      },
      
      // Validation helpers
      canProceedToStep: (step: number) => {
        const state = get();
        
        switch (step) {
          case 1: // User type selection - always accessible
            return true;
          case 2: // Personal details - need user type
            return !!state.userType;
          case 3: // Verification - need personal details
            return !!state.userType && !!state.personalDetails;
          case 4: // Documents - need verification data
            return !!state.userType && !!state.personalDetails && !!state.verificationData;
          case 5: // Complete - need all data
            return !!state.userType && !!state.personalDetails && !!state.verificationData && !!state.documentsData && !!state.clerkUserId;
          default:
            return false;
        }
      },
      
      isStepComplete: (step: number) => {
        const state = get();
        
        switch (step) {
          case 1:
            return !!state.userType;
          case 2:
            return !!state.personalDetails;
          case 3:
            return !!state.verificationData;
          case 4:
            return !!state.documentsData;
          case 5:
            return !!state.clerkUserId;
          default:
            return false;
        }
      },
    }),
    {
      name: 'registration-storage',
      // Only persist certain fields
      partialize: (state) => ({
        userType: state.userType,
        personalDetails: state.personalDetails,
        verificationData: state.verificationData,
        documentsData: state.documentsData,
      }),
    }
  )
);
