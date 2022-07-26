import {db} from '../firebase'

import { collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore'

const presentationsCollectionRef = collection(db, 'presentations');
class PresentationDataService {
    addPresentations = (newPresention) => {
        return addDoc(presentationsCollectionRef, newPresention);
    }

    updatePresentation = (id, updatePresentation) => {
        const presentationDoc = doc(db, 'presentations', id);
        return updateDoc(presentationDoc, updatePresentation);
    }

    deletePresentation = (id) => {
        const presentationDoc = doc(db, 'presentations', id);
        return deleteDoc(presentationDoc);
    }

    getAllPresentations = () => {
        return getDocs(presentationsCollectionRef);
    }

    getPresentationById = (id) => {
        const presentationDoc = doc(db, 'presentations', id);
        return getDoc(presentationDoc);
    }
}

export default new PresentationDataService();