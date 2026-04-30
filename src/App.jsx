import { useEffect, useMemo, useState } from 'react'
import {
  Edit3,
  ImageOff,
  MapPin,
  PackagePlus,
  Search,
  Trash2,
  X,
} from 'lucide-react'

const STORAGE_KEY = 'personal-electronics-inventory'
const VERSION_KEY = 'personal-electronics-inventory-version'
const INVENTORY_VERSION = 'orders-april-2026-v6'

const researchedComponents = [
  {
    id: 'speaker-8ohm-1w',
    name: 'Haut-parleur miniature 8 ohms 1 W',
    reference: 'COM-26553 / 8 ohms 1 W',
    category: 'Audio',
    quantity: 1,
    description: 'Petit haut-parleur rond pour essais audio, casques, avertisseurs et prototypes embarques.',
    imageUrl: '/components/speaker-8ohm-1w.jpg',
    sourceUrl: 'https://www.sparkfun.com/mini-speaker-1w-8-ohm.html',
    location: 'A ranger',
  },
  {
    id: 'lm386n-dip8',
    name: 'Amplificateur audio LM386N DIP-8',
    reference: 'LM386N',
    category: 'Circuit integre audio',
    quantity: 10,
    description: 'Amplificateur audio basse tension en boitier DIP-8, utile pour petits haut-parleurs et montages audio.',
    imageUrl: '/components/ic-dip8.svg',
    sourceUrl: 'https://en.wikipedia.org/wiki/LM386',
    location: 'A ranger',
  },
  {
    id: 'electrolytic-cap-kit-200',
    name: 'Kit de condensateurs electrolytiques 200 pcs',
    reference: '15 valeurs 0.1uF-220uF',
    category: 'Condensateurs',
    quantity: 1,
    description: 'Assortiment de condensateurs electrolytiques radiaux, 15 valeurs, pour filtrage, alimentation et prototypage.',
    imageUrl: '/components/electrolytic-cap-kit-200.jpg',
    sourceUrl: 'https://scccltd.com/en-tw/products/200pcs-electrolytic-capacitor-kit',
    location: 'A ranger',
  },
  {
    id: 'ads1115-module',
    name: 'Module ADC I2C ADS1115 16 bits',
    reference: 'ADS1115 / ADS1015 compatible',
    category: 'Conversion analogique',
    quantity: 1,
    description: 'Convertisseur analogique-numerique I2C 4 canaux avec PGA, resolution 16 bits pour mesures precises.',
    imageUrl: '/components/ads1115-module.jpg',
    sourceUrl: 'https://protosupplies.com/product/ads1115-4-channel-16-bit-adc-module/',
    location: 'A ranger',
  },
  {
    id: 'inductor-kit-0307',
    name: 'Assortiment inductances axiales 0307',
    reference: '0307 1/4W, 12 valeurs, 1uH-470uH',
    category: 'Inductances',
    quantity: 120,
    description: 'Inductances axiales code couleur, 12 valeurs courantes pour filtres et petites alimentations.',
    imageUrl: '/components/inductor-kit-0307.webp',
    sourceUrl:
      'https://pccables.es/product/120-unids-lote-0307-dip-1-4w-12-tipos-inductancia-211300/',
    location: 'A ranger',
  },
  {
    id: 'emg-muscle-sensor',
    name: 'Module capteur musculaire EMG',
    reference: 'Muscle Signal Sensor / EMG',
    category: 'Capteur biomedical',
    quantity: 1,
    description: 'Module analogique pour mesurer et conditionner un signal electromyographique EMG.',
    imageUrl: '/components/emg-muscle-sensor.jpg',
    sourceUrl: 'https://www.voltaat.com/products/arduino-muscle-signal-sensor-emg-sensor',
    location: 'A ranger',
  },
  {
    id: 'pin-header-male-1x40',
    name: 'Barrettes males 1x40 2.54 mm',
    reference: '1x40 male header, pitch 2.54 mm',
    category: 'Connecteurs',
    quantity: 5,
    description: 'Connecteurs males droits secables pour PCB, modules Arduino et prototypage.',
    imageUrl: '/components/pin-header-male.svg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Pin_header',
    location: 'A ranger',
  },
  {
    id: 'pin-header-female-1x40',
    name: 'Barrettes femelles 1x40 2.54 mm',
    reference: '1x40 female header, pitch 2.54 mm',
    category: 'Connecteurs',
    quantity: 5,
    description: 'Connecteurs femelles droits secables pour shields, modules et cartes de prototypage.',
    imageUrl: '/components/pin-header-female.svg',
    sourceUrl:
      'https://shillehtek.com/blogs/shillehtek-product-manuals/shillehtek-20pcs-1x40pin-female-header-2-54mm-header-pins-manual',
    location: 'A ranger',
  },
  {
    id: 'lm324-dip14',
    name: 'Amplificateur operationnel quadruple LM324',
    reference: 'LM324 DIP-14',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Quadruple amplificateur operationnel basse consommation. Fonction: amplification analogique, filtres actifs, comparateurs simples et conditionnement de signaux.',
    imageUrl: '/components/ic-dip14.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'lm393-dip8',
    name: 'Comparateur double LM393',
    reference: 'LM393 DIP-8',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Double comparateur de tension a sortie collecteur ouvert. Fonction: detection de seuil, conversion signal analogique vers logique, capteurs et oscillateurs simples.',
    imageUrl: '/components/ic-dip8.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'lm358-dip8',
    name: 'Amplificateur operationnel double LM358',
    reference: 'LM358 DIP-8',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Double amplificateur operationnel utilisable en alimentation simple. Fonction: amplification de petits signaux, filtrage, adaptation de niveau et interfaces capteurs.',
    imageUrl: '/components/ic-dip8.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'ua741cp-dip8',
    name: 'Amplificateur operationnel UA741CP',
    reference: 'UA741CP DIP-8',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Amplificateur operationnel classique simple. Fonction: amplification analogique generale, montages d apprentissage, filtres et comparateurs simples.',
    imageUrl: '/components/ic-dip8.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'ne555-dip8',
    name: 'Timer NE555',
    reference: 'NE555 DIP-8',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Circuit temporisateur universel. Fonction: temporisations, oscillateurs, generation PWM, clignotants et impulsions monostables/astables.',
    imageUrl: '/components/ic-dip8.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'ne5532-dip8',
    name: 'Amplificateur operationnel audio NE5532',
    reference: 'NE5532 DIP-8',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Double amplificateur operationnel faible bruit pour audio. Fonction: preamplis, filtres audio, buffers et traitement de signal analogique propre.',
    imageUrl: '/components/ic-dip8.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'pc817-dip4',
    name: 'Optocoupleur PC817',
    reference: 'PC817 DIP-4',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Optocoupleur a transistor de sortie. Fonction: isolation galvanique entre deux circuits, interface logique, detection secteur via circuit adapte.',
    imageUrl: '/components/optocoupler-pc817.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'uln2003an-dip16',
    name: 'Driver Darlington ULN2003AN',
    reference: 'ULN2003AN DIP-16',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Reseau de 7 transistors Darlington avec diodes de roue libre. Fonction: piloter relais, moteurs pas a pas 5 fils, solenoides et charges inductives.',
    imageUrl: '/components/ic-dip16.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'uln2803apg-dip18',
    name: 'Driver Darlington ULN2803APG',
    reference: 'ULN2803APG DIP-18',
    category: 'Circuits integres',
    quantity: 1,
    description:
      'Reseau de 8 transistors Darlington avec diodes de roue libre. Fonction: piloter plusieurs relais, LEDs, bobines, moteurs et charges depuis une logique faible courant.',
    imageUrl: '/components/ic-dip18.svg',
    sourceUrl:
      'https://www.adeept.com/adeept-169pcs-21-types-integrated-circuits-chip-assortment-kit-including-opamp-oscillator-pwm-lm324-lm358-lm386-lm393-ne5532-ne555-pc817-ul_p0265.html',
    location: 'A ranger',
  },
  {
    id: 'sn74hc595n',
    name: 'Registres a decalage SN74HC595N',
    reference: 'SN74HC595N PDIP-16',
    category: 'Logique',
    quantity: 10,
    description: 'Registre a decalage 8 bits serie vers parallele avec verrouillage, boitier DIP-16.',
    imageUrl: '/components/ic-dip16.svg',
    sourceUrl: 'https://www.ti.com/product/SN74HC595/part-details/SN74HC595N',
    location: 'A ranger',
  },
  {
    id: 'stm32f103c8t6-blue-pill',
    name: 'Carte STM32F103C8T6 Blue Pill',
    reference: 'STM32F103C8T6',
    category: 'Microcontroleur',
    quantity: 1,
    description: 'Carte de developpement compacte ARM Cortex-M3, souvent appelee Blue Pill.',
    imageUrl: '/components/stm32f103c8t6-blue-pill.jpg',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Blue_Pill.jpg',
    location: 'A ranger',
  },
  {
    id: 'ad8232-ecg',
    name: 'Module ECG AD8232',
    reference: 'AD8232 / SEN-12650',
    category: 'Capteur biomedical',
    quantity: 1,
    description: 'Module front-end ECG mono-derivation pour mesurer une activite cardiaque en sortie analogique.',
    imageUrl: '/components/ad8232-ecg.jpg',
    sourceUrl: 'https://www.sparkfun.com/sparkfun-single-lead-heart-rate-monitor-ad8232.html',
    location: 'A ranger',
  },
  {
    id: 'diode-kit-1n400x',
    name: 'Kit diodes redresseuses Schottky/1N400x',
    reference: '1N4001, 1N4004, 1N4005, 1N4007',
    category: 'Diodes',
    quantity: 50,
    description: 'Assortiment de diodes de redressement pour protection, redressement et montages d alimentation.',
    imageUrl: '/components/diode-kit.svg',
    sourceUrl: 'https://en.wikipedia.org/wiki/1N400x_rectifier_diodes',
    location: 'A ranger',
  },
  {
    id: 'bluetooth-mp3-vhm314',
    name: 'Carte recepteur audio Bluetooth 5.0',
    reference: 'VHM-314 Type-C',
    category: 'Audio',
    quantity: 3,
    description: 'Module decodeur MP3 et recepteur audio Bluetooth 5.0 avec alimentation USB-C.',
    imageUrl: '/components/bluetooth-audio-module.svg',
    sourceUrl:
      'https://robu.in/product/blackboard-vhm-314-bluetooth-5-0-mp3-decoder-board-%EF%BC%88type-c%EF%BC%89/',
    location: 'A ranger',
  },
  {
    id: 'pcm5102a-dac',
    name: 'Module DAC I2S PCM5102A',
    reference: 'PCM5102A',
    category: 'Audio',
    quantity: 1,
    description: 'Convertisseur audio I2S vers sortie ligne stereo, pratique avec ESP32, Raspberry Pi et lecteurs audio DIY.',
    imageUrl: '/components/pcm5102a-dac.jpg',
    sourceUrl: 'https://www.adafruit.com/product/6250',
    location: 'A ranger',
  },
  {
    id: 'transistor-2n3904',
    name: 'Transistors NPN 2N3904 TO-92',
    reference: '2N3904',
    category: 'Transistors',
    quantity: 100,
    description: 'Transistor NPN generaliste pour commutation et amplification faible puissance.',
    imageUrl: '/components/transistor-2n3904.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/2N3904',
    location: 'A ranger',
  },
  {
    id: 'breadboard-mb102',
    name: 'Breadboard MB-102 830 points',
    reference: 'MB-102 / 830 tie points',
    category: 'Prototypage',
    quantity: 1,
    description: 'Plaque d essai sans soudure pour circuits DIP, modules et fils Dupont.',
    imageUrl: '/components/breadboard-mb102.jpg',
    sourceUrl: 'https://masterlexon.com/en/mb-102-830-tie-point-breadboard',
    location: 'A ranger',
  },
  {
    id: 'stlink-v2',
    name: 'Programmeur ST-LINK/V2',
    reference: 'ST-LINK/V2',
    category: 'Programmation',
    quantity: 1,
    description: 'Debogueur et programmateur pour microcontroleurs STM8 et STM32 via SWIM, JTAG ou SWD.',
    imageUrl: '/components/stlink-v2.svg',
    sourceUrl: 'https://www.st.com/en/development-tools/st-link-v2.html',
    location: 'A ranger',
  },
  {
    id: 'tact-switch-6x6',
    name: 'Boutons poussoirs tactiles 6x6 mm',
    reference: '6x6x5 mm, 4 broches',
    category: 'Interrupteurs',
    quantity: 40,
    description: 'Boutons tactiles momentanes pour interfaces, reset, menus et prototypes sur PCB.',
    imageUrl: '/components/tact-switch-6x6.svg',
    sourceUrl: 'https://www.pixelelectric.com/tactile-switches/tactile-tact-pushbutton-6x6x5mm/',
    location: 'A ranger',
  },
  {
    id: 'ceramic-cap-kit-300',
    name: 'Kit condensateurs ceramiques 300 pcs',
    reference: '15 valeurs 10pF-100nF',
    category: 'Condensateurs',
    quantity: 1,
    description: 'Assortiment de condensateurs ceramiques radiaux pour filtrage, oscillateurs et decouplage.',
    imageUrl: '/components/ceramic-cap-kit-300.jpg',
    sourceUrl: 'https://vetco.net/products/vupn1671_ceramic_capacitor_kit_-300_pcs-_10pf-100nf',
    location: 'A ranger',
  },
  {
    id: 'elegoo-starter-kit',
    name: 'Kit de demarrage electronique Arduino',
    reference: 'ELEGOO UNO R3 Most Complete Starter Kit',
    category: 'Kit complet',
    quantity: 1,
    description: 'Kit complet avec carte UNO compatible Arduino, breadboard, capteurs, afficheurs, cables et composants.',
    imageUrl: '/components/elegoo-starter-kit.jpg',
    sourceUrl: 'https://www.elegoo.com/products/elegoo-uno-most-complete-starter-kit',
    location: 'A ranger',
  },
  {
    id: 'msp432e401y-launchpad',
    name: 'LaunchPad TI MSP432E401Y',
    reference: 'MSP-EXP432E401Y',
    category: 'Microcontroleur',
    quantity: 1,
    description: 'Carte LaunchPad Texas Instruments SimpleLink Ethernet avec microcontroleur ARM Cortex-M4F.',
    imageUrl: '/components/msp432e401y-launchpad.svg',
    sourceUrl: 'https://energia.nu/pinmaps/msp-exp432e401y/',
    location: 'A ranger',
  },
  {
    id: 'joystick-potentiometer-3pin',
    name: 'Potentiometres de joystick analogique 3 broches',
    reference: 'Alps RKJXV / module potentiometre 3 pins',
    category: 'Pieces de reparation',
    quantity: 8,
    description:
      'Modules potentiometres pour joystick analogique de manette, utiles pour reparer le drift ou un axe instable. Compatibilite a verifier selon la manette et le nombre de broches.',
    imageUrl: '/components/joystick-potentiometer-3pin.webp',
    sourceUrl:
      'https://www.zedlabz.com/products/replacement-analog-sticks-for-sony-ps3-controllers-3-pin-2-pack-alps',
    location: 'A ranger',
  },
]

const emptyForm = {
  name: '',
  reference: '',
  category: '',
  quantity: 1,
  description: '',
  imageUrl: '',
  sourceUrl: '',
  location: '',
}

function readStoredComponents() {
  try {
    const version = localStorage.getItem(VERSION_KEY)
    if (version !== INVENTORY_VERSION) {
      localStorage.setItem(VERSION_KEY, INVENTORY_VERSION)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(researchedComponents))
      return researchedComponents
    }

    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : researchedComponents
  } catch {
    return researchedComponents
  }
}

function App() {
  const [components, setComponents] = useState(readStoredComponents)
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(components))
  }, [components])

  const selectedComponent = components.find((component) => component.id === selectedId)

  const filteredComponents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return components

    return components.filter((component) =>
      [component.name, component.reference, component.category, component.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    )
  }, [components, query])

  const totalQuantity = components.reduce(
    (total, component) => total + Number(component.quantity || 0),
    0,
  )

  function openCreateForm() {
    setEditingId(null)
    setForm(emptyForm)
    setIsFormOpen(true)
  }

  function openEditForm(component) {
    setEditingId(component.id)
    setForm({
      name: component.name,
      category: component.category,
      reference: component.reference || '',
      quantity: component.quantity,
      description: component.description,
      imageUrl: component.imageUrl,
      sourceUrl: component.sourceUrl || '',
      location: component.location || '',
    })
    setIsFormOpen(true)
  }

  function saveComponent(event) {
    event.preventDefault()

    const cleanedComponent = {
      ...form,
      id: editingId ?? crypto.randomUUID(),
      name: form.name.trim(),
      reference: form.reference.trim(),
      category: form.category.trim(),
      quantity: Math.max(0, Number(form.quantity) || 0),
      description: form.description.trim(),
      imageUrl: form.imageUrl.trim(),
      sourceUrl: form.sourceUrl.trim(),
      location: form.location.trim(),
    }

    setComponents((current) =>
      editingId
        ? current.map((component) =>
            component.id === editingId ? cleanedComponent : component,
          )
        : [cleanedComponent, ...current],
    )
    setSelectedId(cleanedComponent.id)
    setIsFormOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function deleteComponent(component) {
    const confirmed = window.confirm(`Supprimer "${component.name}" de l'inventaire ?`)
    if (!confirmed) return

    setComponents((current) => current.filter((item) => item.id !== component.id))
    if (selectedId === component.id) setSelectedId(null)
    if (editingId === component.id) setIsFormOpen(false)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
              Inventaire local
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Stock de composants electroniques
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Recherchez, ajoutez et organisez vos composants depuis une page unique.
              Les donnees sont sauvegardees automatiquement dans ce navigateur.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <Stat label="References" value={components.length} />
            <Stat label="Pieces" value={totalQuantity} />
          </div>
        </header>

        <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
          <label className="relative flex min-h-12 flex-1 items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
              placeholder="Rechercher par nom, reference, categorie ou description"
              type="search"
            />
          </label>
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
            type="button"
            onClick={openCreateForm}
          >
            <PackagePlus className="h-5 w-5" />
            Ajouter un composant
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredComponents.map((component) => (
            <ComponentCard
              component={component}
              key={component.id}
              onDelete={deleteComponent}
              onEdit={openEditForm}
              onSelect={setSelectedId}
            />
          ))}
        </section>

        {filteredComponents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Aucun composant ne correspond a votre recherche.
          </div>
        )}
      </div>

      {selectedComponent && (
        <DetailsPanel
          component={selectedComponent}
          onClose={() => setSelectedId(null)}
          onDelete={deleteComponent}
          onEdit={openEditForm}
        />
      )}

      {isFormOpen && (
        <ComponentForm
          form={form}
          isEditing={Boolean(editingId)}
          onChange={setForm}
          onClose={() => setIsFormOpen(false)}
          onSubmit={saveComponent}
        />
      )}
    </main>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function ComponentCard({ component, onDelete, onEdit, onSelect }) {
  return (
    <article
      className="group grid grid-cols-[92px_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
    >
      <button
        className="overflow-hidden rounded-xl bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-100"
        type="button"
        onClick={() => onSelect(component.id)}
        aria-label={`Consulter ${component.name}`}
      >
        <ImageView src={component.imageUrl} alt={component.name} className="h-24 w-full" />
      </button>
      <div className="min-w-0">
        <button className="block w-full text-left" type="button" onClick={() => onSelect(component.id)}>
          <h2 className="truncate text-lg font-semibold text-slate-950">{component.name}</h2>
          <p className="mt-1 truncate text-sm text-slate-500">{component.category}</p>
          {component.reference && (
            <p className="mt-1 truncate text-xs font-medium text-slate-400">
              Ref. {component.reference}
            </p>
          )}
        </button>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-800">
            Qte {component.quantity}
          </span>
          <div className="flex gap-1">
            <IconButton label="Modifier" onClick={() => onEdit(component)}>
              <Edit3 className="h-4 w-4" />
            </IconButton>
            <IconButton label="Supprimer" danger onClick={() => onDelete(component)}>
              <Trash2 className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </div>
    </article>
  )
}

function DetailsPanel({ component, onClose, onDelete, onEdit }) {
  return (
    <div className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm" onClick={onClose}>
      <aside
        className="ml-auto flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <p className="text-sm font-semibold text-slate-600">Fiche composant</p>
          <IconButton label="Fermer" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="p-5 sm:p-6">
          <ImageView
            src={component.imageUrl}
            alt={component.name}
            className="h-72 w-full rounded-2xl border border-slate-200 bg-slate-100"
          />
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-3xl font-semibold tracking-normal text-slate-950">
                {component.name}
              </h2>
              <p className="mt-2 text-base text-slate-500">{component.category}</p>
              {component.reference && (
                <p className="mt-2 text-sm font-medium text-slate-500">
                  Reference: {component.reference}
                </p>
              )}
            </div>
            <span className="w-fit rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
              Quantite {component.quantity}
            </span>
          </div>
          <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-slate-700">
            {component.description || 'Aucune description renseignee.'}
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <MapPin className="h-5 w-5 text-slate-500" />
            <span>{component.location || 'Aucun emplacement renseigne'}</span>
          </div>
          {component.sourceUrl && (
            <a
              className="mt-4 inline-flex text-sm font-semibold text-sky-700 transition hover:text-sky-900"
              href={component.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              Source web
            </a>
          )}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              type="button"
              onClick={() => onEdit(component)}
            >
              <Edit3 className="h-5 w-5" />
              Modifier
            </button>
            <button
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-700"
              type="button"
              onClick={() => onDelete(component)}
            >
              <Trash2 className="h-5 w-5" />
              Supprimer
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

function ComponentForm({ form, isEditing, onChange, onClose, onSubmit }) {
  const updateField = (field, value) => onChange((current) => ({ ...current, [field]: value }))

  return (
    <div className="fixed inset-0 z-40 flex items-end bg-slate-950/40 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6">
      <form
        className="max-h-[94vh] w-full overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl sm:max-w-2xl sm:rounded-3xl sm:p-6"
        onSubmit={onSubmit}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-sky-700">
              {isEditing ? 'Modification' : 'Nouvelle reference'}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-slate-950">
              {isEditing ? 'Modifier le composant' : 'Ajouter un composant'}
            </h2>
          </div>
          <IconButton label="Fermer" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nom" required value={form.name} onChange={(value) => updateField('name', value)} />
          <Field
            label="Reference"
            value={form.reference}
            onChange={(value) => updateField('reference', value)}
          />
          <Field
            label="Categorie"
            required
            value={form.category}
            onChange={(value) => updateField('category', value)}
          />
          <Field
            label="Quantite"
            min="0"
            type="number"
            required
            value={form.quantity}
            onChange={(value) => updateField('quantity', value)}
          />
          <Field
            label="Emplacement"
            value={form.location}
            onChange={(value) => updateField('location', value)}
          />
          <Field
            className="sm:col-span-2"
            label="URL d'image"
            type="url"
            value={form.imageUrl}
            onChange={(value) => updateField('imageUrl', value)}
          />
          <Field
            className="sm:col-span-2"
            label="Source web"
            type="url"
            value={form.sourceUrl}
            onChange={(value) => updateField('sourceUrl', value)}
          />
          <label className="sm:col-span-2">
            <span className="text-sm font-medium text-slate-700">Description</span>
            <textarea
              className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="h-12 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            type="button"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="h-12 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            {isEditing ? 'Enregistrer' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({ className = '', label, onChange, ...props }) {
  return (
    <label className={className}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100"
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  )
}

function ImageView({ src, alt, className }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const hasError = src && failedSrc === src

  if (!src || hasError) {
    return (
      <div className={`${className} flex flex-col items-center justify-center gap-2 bg-slate-100 p-3 text-center text-slate-400`}>
        <ImageOff className="h-8 w-8" />
        <span className="line-clamp-2 text-xs font-semibold text-slate-500">{alt}</span>
      </div>
    )
  }

  return (
    <img
      className={`${className} object-cover`}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailedSrc(src)}
    />
  )
}

function IconButton({ children, danger = false, label, onClick }) {
  return (
    <button
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition focus:outline-none focus:ring-4 ${
        danger
          ? 'border-red-100 bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-100'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-sky-100'
      }`}
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
    >
      {children}
    </button>
  )
}

export default App
