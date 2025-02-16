<template>
  <div class="bg-gray-100 h-full w-full flex justify-center items-center">
    <div class="h-full w-full flex flex-col items-center">
      <form
        class="shadow-md p-6 bg-white rounded-lg"
        @submit.prevent="handleSubmit"
      >
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold">
            CADASTRO DO CLIENTE PESSOA FÍSICA
          </h2>
          <div class="flex justify-end -mt-8 pr-4">
            <button
              @click="handleGoBack"
              class="flex items-center text-blue-500 hover:underline"
            >
              <img :src="ArrowBack" alt="ArrowBack" class="w-5 mr-1" />
              Voltar
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col">
            <label for="name" class="font-medium">Nome:</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="border p-2 rounded"
            />
          </div>

          <div class="flex flex-col">
            <label class="font-medium">Sexo:</label>
            <div class="flex items-center space-x-4">
              <label class="flex items-center space-x-1">
                <input
                  id="gender-m"
                  v-model="gender"
                  type="radio"
                  value="M"
                  class="h-4 w-4"
                />
                <span>Masculino</span>
              </label>
              <label class="flex items-center space-x-1">
                <input
                  id="gender-f"
                  v-model="gender"
                  type="radio"
                  value="F"
                  class="h-4 w-4"
                />
                <span>Feminino</span>
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="flex flex-col">
            <label for="docTypes" class="font-medium">Tipo de Doc:</label>
            <select
              id="docTypes"
              v-model="documentTypeId"
              @change="updateDocTypeID"
              required
              class="border p-2 rounded"
            >
              <option
                v-for="type in docTypes.filter((type) => type.name !== 'CNPJ')"
                :key="type.id"
                :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="documentNumber" class="font-medium"
              >Nº Documento:</label
            >
            <input
              id="documentNumber"
              v-model="documentNumber"
              type="text"
              required
              v-mask="maskPattern"
              class="border p-2 rounded"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="flex flex-col">
            <label for="issueDate" class="font-medium">Data de emissão:</label>
            <input
              id="issueDate"
              v-model="issueDate"
              type="date"
              class="border p-2 rounded"
            />
          </div>
          <div class="flex flex-col">
            <label for="expiryDate" class="font-medium"
              >Data de Expiração:</label
            >
            <input
              id="expiryDate"
              v-model="expiryDate"
              type="date"
              class="border p-2 rounded"
            />
          </div>
        </div>

        <div class="flex flex-col mt-4">
          <label for="birthDate" class="font-medium">Data de Nascimento:</label>
          <input
            id="birthDate"
            v-model="birthDate"
            type="date"
            required
            class="border p-2 rounded"
          />
        </div>

        <div class="flex items-center mt-4">
          <label class="font-medium mr-2">É PcD?</label>
          <input
            type="checkbox"
            v-model="isPcd"
            @change="handlePcdChange"
            class="h-4 w-4"
          />
        </div>

        <div class="flex flex-col mt-4">
          <label for="document" class="font-medium">Se sim, qual?</label>
          <input
            id="document"
            :disabled="!isPcd"
            :required="isPcd"
            v-model="additionalText"
            placeholder="Digite a deficiência"
            class="border p-2 rounded disabled:bg-gray-200"
          />
        </div>

        <button
          type="submit"
          class="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ButtonConfirm,
  ButtonGoBack,
} from "@/components/DesignSystem/Buttons/styles";
import {
  ColumnCenter,
  RowCenter,
  RowStart,
} from "@/components/DesignSystem/CommonTags";
import { Slider } from "@/components/Management/styles";
import ArrowBack from "@/assets/icons/arrow-left-top.svg";
import { useRouter } from "vue-router";
import { computed, onMounted } from "vue";
import { LabelTicket, TitleTicket } from "@/components/TicketComponents/styles";
import { toast } from "vue3-toastify";
import {
  createNewClient,
  fetchClientByDocument,
  getCep,
  getCities,
  getCountries,
  getDocTypes,
  getSpecialConditions,
  getStates,
} from "@/services";
import { ref, watch } from "vue";
import { formatName } from "@/utils/NameFormatter";
import { useClientStore } from "@/stores/ClientStore";

const currentIndex = ref(0);
const currentIndexContact = ref(0);
const name = ref<string>("");
const birthDate = ref("");
const gender = ref("M");
const selectedCountryId = ref(null);
const selectedStateId = ref(null);
const selectedCityId = ref(0);
const router = useRouter();
const docTypeID = ref<number>(0);
const countries = ref<any[]>([]);
const states = ref<any>([]);
const cities = ref<any>([]);
const isPcd = ref(false);
const nationalityId = ref(1);
const documentTypeId = ref(1);
const documentNumber = ref("");
const selectedDocType = ref<any>(null);
const selectedConditionIds = ref<any[]>([]);
const issuingAuthority = ref("");
const issuePlace = ref("");
const issueDate: any = ref(null);
const expiryDate: any = ref(null);
const additionalTextSpecialCondition = ref<string>("");
const additionalText = ref<string>("");

// Computed para filtrar apenas a página atual

const addresses = ref([
  {
    postalCode: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
    country: "",
  },
]);

const handlePcdChange = () => {
  if (!isPcd.value) {
    additionalText.value = "";
  }
};

const contacts = ref<Contact[]>([
  {
    value: "", // Exemplo de WhatsApp
    typeId: 2,
  },
]);
const email = ref("");
const specialConditions = ref<any[]>([]);

const docTypes = ref<any>([]);

type Contact = {
  value: string; // Armazena o número de telefone, WhatsApp ou email
  typeId: 1 | 2; // Tipo do contato
};

const addContact = () => {
  contacts.value.push({
    value: "", // Valor inicial vazio
    typeId: 2, // Tipo inicial como "Whatsapp"
  });
  currentIndexContact.value = contacts.value.length - 1; // Vai para o novo contato
};

// Função para avançar para o próximo contato
const nextContact = () => {
  if (currentIndexContact.value < contacts.value.length - 1) {
    currentIndexContact.value++;
  }
};

// Função para voltar ao contato anterior
const previousContact = () => {
  if (currentIndexContact.value > 0) {
    currentIndexContact.value--;
  }
};

const updateDocTypeID = () => {
  docTypeID.value = selectedDocType.value;
};
const handleGoBack = () => {
  router.go(-1);
};

const handleCheckboxConditions = () => {
  // Ensure selectedConditionIds and additionalTextSpecialCondition are valid
  if (!selectedConditionIds.value.includes(6)) {
    additionalTextSpecialCondition.value = "";
  } else {
    return;
  }
};

const maskPattern = computed(() => {
  switch (documentTypeId.value) {
    case 1: // RG
      return "XXXXXXXXXXXXXX";
    case 2: // CPF
      return "###.###.###-##";
    case 3: // CNPJ
      return "##.###.###/####-##";
    case 4: // PASSAPORTE
      return "AA######";
    case 5: // CNH
      return "#########";
    default:
      return "#########################################################";
  }
});
// Função para buscar o endereço
const buscarEndereco = async (cepValue: any) => {
  try {
    const response = await getCep(cepValue);
    addresses.value[0].street = response.street;
    addresses.value[0].city = response.city;
    addresses.value[0].state = response.state;
    addresses.value[0].district = response.neighborhood;
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
  }
};

watch(
  () => addresses.value[0]?.postalCode, // Transforma em função reativa
  (newCep) => {
    if (newCep?.replace(/[^a-zA-Z0-9]/g, "").length === 8) {
      buscarEndereco(newCep.replace(/[^a-zA-Z0-9]/g, ""));
    }
  }
);

const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // CPF deve ter 11 dígitos
  if (cpf.length !== 11) return false;

  // Rejeita CPFs com todos os números iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Calcula os dígitos verificadores para validar o CPF
  const calcDigit = (factor: number) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    let remainder = (total * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const digit1 = calcDigit(10);
  const digit2 = calcDigit(11);

  return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
};

const handleSubmit = async () => {
  if (documentTypeId.value === 2) {
    const isCPFvalid = validateCPF(
      documentNumber.value.replace(/[^a-zA-Z0-9]/g, "")
    );
    if (!isCPFvalid) {
      toast.error("CPF inválido. Tente novamente.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  }

  // Limpar os endereços
  addresses.value = addresses.value.map((address) => ({
    ...address,
    postalCode: address.postalCode.replace(/[^a-zA-Z0-9]/g, ""), // Remover caracteres especiais do postalCode
  }));

  // Limpar os contatos e alterar o tipo para 2 (Telefone) ou 1 (Email)
  contacts.value = contacts.value.map((contact) => {
    // Se o tipo for 'Telefone', altera o tipo para 2 e limpa os caracteres não numéricos
    if (contact.typeId === 2) {
      return {
        ...contact,
        value: contact.value.replace(/[^a-zA-Z0-9]/g, ""), // Remover caracteres especiais dos números
        type: 2, // Tipo 2 para Telefone
      };
    }

    // Se for 'Email', altera o tipo para 1
    if (contact.typeId === 1) {
      return {
        ...contact,
        type: 1, // Tipo 1 para Email
      };
    }

    // Para outros tipos, mantém o contato como está
    return contact;
  });

  try {
    await createNewClient({
      name: name.value,
      professionId: 1,
      isCompany: false,
      birthDate: birthDate.value,
      gender: gender.value,
      placeOfBirthId: selectedCityId.value,
      nationalityId: nationalityId.value,
      documentTypeId: documentTypeId.value,
      documentNumber: documentNumber.value.replace(/[^a-zA-Z0-9]/g, ""),
      issuingAuthority: issuingAuthority.value.toUpperCase(),
      issuePlace: formatName(issuePlace.value),
      issueDate:
        issueDate.value && issueDate.value.length ? issueDate.value : null,
      expiryDate:
        expiryDate.value && expiryDate.value.length ? expiryDate.value : null,
      addresses: addresses.value, // Agora já está com os valores limpos
      contacts: contacts.value.filter((contact) => contact.value.trim() !== ""), // Apenas contatos com valor preenchido
      email: email.value,
      isPcd: isPcd.value,
      specialConditions: selectedConditionIds.value,
      isPcdAdditionalObservation: additionalText.value,
      specialConditionsAdditionalObservation:
        additionalTextSpecialCondition.value,
    });
    let docNumFormatted = documentNumber.value.replace(/[^a-zA-Z0-9]/g, "");

    const clientStore = useClientStore();
    const detailedClientData = await fetchClientByDocument(docNumFormatted);
    clientStore.clientData = detailedClientData;

    router.push({
      name: "dadosCliente",
      params: { documento: docNumFormatted },
    });
  } catch (err) {
    console.log("err ", err);
  }
};

onMounted(async () => {
  countries.value = await getCountries();
  docTypes.value = await getDocTypes();
  specialConditions.value = await getSpecialConditions();
  states.value = await getStates();
});
watch(
  () => selectedStateId.value,
  async (newValue) => {
    cities.value = await getCities(newValue);
  },
  { immediate: true }
);
</script>
<style scoped>
* {
  font-size: 0.9rem;
}
.contact-form {
  width: 100%;
}
.form-container {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  max-width: 97.5%;
  margin: auto;
  margin-top: 10px;
  max-height: 95vh;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  padding-top: 0;
}

.form-grid {
  position: relative;
  display: grid;
  font-size: 0.9rem;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 85%;
  width: 100%;
  overflow-y: auto;
  @media (min-width: 1681px) and (max-width: 1920px) {
    height: 90%;
  }
  @media (min-width: 1366px) and (max-width: 1680px) {
    height: 85%;
  }
  @media (min-width: 767px) and (max-width: 1365px) {
    height: 80%;
  }
}

.form-group {
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 15px;
}

input {
  height: 30px;
  padding: 0px 8px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  height: 30px;
  width: 100%;
  padding: 0px 8px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.disabled-select {
  background-color: #ccc;
  border: 1px solid #b9b9b9;
  color: black;
  cursor: not-allowed;
  opacity: 0.6;
}
.grayButton {
  width: 100%;
  border: 1px solid #ccc;
  padding: 6px 5px;
  border-radius: 5px;
  color: #000000;
  background-color: #d8d8d8;
  cursor: pointer;
  height: 30px;
  text-align: center;
  transition: ease 0.4s;
  white-space: nowrap;
}
.submit-button {
  margin-top: 20px;
  max-width: 150px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.radio-group-sex {
  display: flex;
  justify-content: start;
  align-items: center;
  max-width: 50%;
  gap: 5px;
}
.row-group {
  gap: 10px;
}

@media (min-width: 1921px) {
}

@media (min-width: 1681px) and (max-width: 1920px) {
  .form-grid {
    height: 85%;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .form-grid {
    height: 80%;
  }

  .form-container {
    max-width: 90%;
  }

  .submit-button {
    width: 100%;
  }
}
</style>
